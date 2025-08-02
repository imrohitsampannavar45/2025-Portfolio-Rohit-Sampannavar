export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  mood: 'happy' | 'sad' | 'neutral' | 'excited' | 'stressed';
  createdAt: Date;
  updatedAt: Date;
}

// Mock diary entries - in a real app, this would be stored in a database
let diaryEntries: DiaryEntry[] = [
  {
    id: '1',
    title: 'First Day at New Job',
    content: 'Today was my first day at TechCorp. The team seems amazing and I\'m excited about the projects ahead. The onboarding process was smooth and I already feel welcomed.',
    mood: 'excited',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Completed Major Project',
    content: 'Finally finished the user dashboard redesign project. It took 3 months of hard work, but seeing the 40% increase in user engagement makes it all worth it.',
    mood: 'happy',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  }
];

export const getDiaryEntries = (): DiaryEntry[] => {
  return diaryEntries.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const createDiaryEntry = (entry: Omit<DiaryEntry, 'id' | 'createdAt' | 'updatedAt'>): DiaryEntry => {
  const newEntry: DiaryEntry = {
    ...entry,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  diaryEntries.push(newEntry);
  return newEntry;
};

export const updateDiaryEntry = (id: string, updates: Partial<Omit<DiaryEntry, 'id' | 'createdAt'>>): DiaryEntry | null => {
  const index = diaryEntries.findIndex(entry => entry.id === id);
  if (index === -1) return null;
  
  diaryEntries[index] = {
    ...diaryEntries[index],
    ...updates,
    updatedAt: new Date()
  };
  return diaryEntries[index];
};

export const deleteDiaryEntry = (id: string): boolean => {
  const index = diaryEntries.findIndex(entry => entry.id === id);
  if (index === -1) return false;
  
  diaryEntries.splice(index, 1);
  return true;
};