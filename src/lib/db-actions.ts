'use server';

import { db } from './firebase-admin';
import type { Brief, AllContent, Project } from './types';

const FREE_GENERATION_LIMIT = 5;

export async function checkGenerationLimit(userId: string, isPro: boolean): Promise<void> {
  if (!isPro) {
    const projectsQuery = db.collection('projects').where('userId', '==', userId);
    const snapshot = await projectsQuery.count().get();
    const projectCount = snapshot.data().count;
    if (projectCount >= FREE_GENERATION_LIMIT) {
      throw new Error(`Вы исчерпали лимит в ${FREE_GENERATION_LIMIT} бесплатных генераций. Пожалуйста, перейдите на Pro тариф.`);
    }
  }
}

export async function saveNewProject(userId: string, brief: Brief, content: AllContent): Promise<string> {
  try {
    const docRef = await db.collection('projects').add({ userId, brief, content, createdAt: new Date() });
    return docRef.id;
  } catch (error) {
    console.error('Error saving new project to Firestore:', error);
    throw new Error('Failed to save the new project.');
  }
}

export async function updateProject(projectId: string, brief: Brief, content: AllContent): Promise<Project> {
    try {
      const projectRef = db.collection('projects').doc(projectId);
      await projectRef.update({ brief: brief, content: content, updatedAt: new Date() });
      const updatedProjectDoc = await projectRef.get();
      const updatedProject = { id: updatedProjectDoc.id, ...updatedProjectDoc.data() } as Project;
      return JSON.parse(JSON.stringify(updatedProject));
    } catch (error) {
      console.error('Error updating project:', error);
      throw new Error('Failed to update project in the database.');
    }
}


export async function getProjectsForUser(userId: string): Promise<Project[]> {
  if (!userId) throw new Error('User not authenticated.');
  try {
    const q = db.collection('projects').where('userId', '==', userId).orderBy('createdAt', 'desc');
    const querySnapshot = await q.get();
    const projects = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate ? data.createdAt.toDate() : data.createdAt,
      };
    }) as Project[];
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Could not retrieve projects from the database.');
  }
}

export async function getProjectById(projectId: string): Promise<Project | null> {
  if (!projectId) throw new Error('Project ID is required.');
  try {
    const projectDoc = await db.collection('projects').doc(projectId).get();
    if (!projectDoc.exists) return null;
    const data = projectDoc.data()!;
    const project = {
      id: projectDoc.id,
      ...data,
      createdAt: data.createdAt.toDate ? data.createdAt.toDate() : data.createdAt,
    } as Project;
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    throw new Error('Could not retrieve project from the database.');
  }
}