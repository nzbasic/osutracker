import Card from './Card';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

interface Article {
  page: string;
  content: string;
  link: string;
  id: number;
}

interface DocsProps {
  articles: Article[]
}

const articles: Article[] = [
  { 
    page: 'Meta',
    content: 'Recent farm maps',
    link: '/apps/meta/trends',
    id: 1,
  }
]

const Website = () => {
  return (
    <>
      {articles.map(({ page, content, id, link }) => (
        <Card
          key={id}
          name={page}
          value={content}
          href={link}
        >
          <div className="w-8 h-8 flex items-center justify-center font-semibold">
            <DocumentTextIcon />
          </div>
        </Card>
      ))}
    </>
  )
};

export default Website;
