import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { projects } from '@/lib/constants';

const title = 'My GitHub Projects';

export async function generateMetadata() {
  return {
    title: title,
    description: title,
    slug: 'projects',
  };
}

const ProjectPage = async () => {
  return (
    <div className="mt-6">
      <h1 className="text-3xl text-center">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="w-full">
            <CardHeader>
              <CardTitle className="mb-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline"
                >
                  {project.name}
                </a>
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>Additional content here</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
