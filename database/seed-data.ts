
interface SeedData{
  entries: SeedEntry[];
}

interface SeedEntry{
  description: string;
  status: string;
  createdAt: number;
}
export const seedData: SeedData = {
  entries: [
    {
      description: 'Pendiente: Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, accusamus veritatis veniam asperiores non eum harum dolorem quae similique, necessitatibus quidem suscipit ullam commodi laboriosam. Illo inventore nihil quidem harum!',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      description: 'En progreso: Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, accusamus veritatis veniam asperiores non eum harum dolorem quae similique, necessitatibus quidem suscipit ullam commodi laboriosam. Illo inventore nihil quidem harum!',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      description: 'Terminado: Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, accusamus veritatis veniam asperiores non eum harum dolorem quae similique, necessitatibus quidem suscipit ullam commodi laboriosam. Illo inventore nihil quidem harum!',
      status: 'finished',
      createdAt: Date.now() - 100000,
    }
  ]
}
