// src/components/Link/Link.ts

interface LinkProps {
    page: string;
    children: any;
    onNavigate: (page: string) => void;
}

function Link ({ page, children, onNavigate }: LinkProps) {
    const link = document.createElement('a');
    link.href = "#";
    link.innerHTML = children;

    link.addEventListener('click', (event) => {
        event.preventDefault();
        onNavigate(page);
    })

    return link;
}

export default Link;