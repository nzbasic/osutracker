import Card from "./Card";

interface Article {
    page: string;
    content: string;
    link: string;
    id: number;
}

interface WebsiteProps {
    onNavigate: () => void;
    articles?: Article[];
}

const articles: Article[] = [
    {
        page: "Meta",
        content: "Recent farm maps",
        link: "/apps/meta/trends",
        id: 1,
    },
];

const Website = ({ onNavigate }: WebsiteProps) => {
    return (
        <>
            {articles.map(({ page, content, id, link }) => (
                <Card
                    key={id}
                    name={page}
                    value={content}
                    href={link}
                    onClick={onNavigate}
                >
                    <div className="flex h-8 w-8 items-center justify-center font-semibold">
                        {/* <DocumentTextIcon /> */}
                    </div>
                </Card>
            ))}
        </>
    );
};

export default Website;
