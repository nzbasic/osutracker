import Link from 'next/link'
import Image from 'next/image';
import ReactCountryFlag from 'react-country-flag';
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
    <div>
      <div className="font-semibold p-4">Website</div>
      <div className="flex flex-col px-4 gap-1">
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
      </div>
    </div>
  )
};

export default Website;

