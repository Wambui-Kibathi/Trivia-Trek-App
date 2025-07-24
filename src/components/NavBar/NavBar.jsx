export function NavBar({ onNavigate }) {
    const handleClick = (e, page) => {
        e.preventDefault();
        onNavigate(page);
    };

    return (
        <nav className="navbar" style={{ marginBottom: '32px' }}>
            <ul style={{ display: 'flex', justifyContent: 'center', gap: '2.5em', padding: 0, margin: 0, listStyle: 'none' }}>
                <li>
                    <a href="#" className="nav-link" onClick={(e) => handleClick(e, 'quiz')}>
                        Quiz
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link" onClick={(e) => handleClick(e, 'about')}>
                        About
                    </a>
                </li>
            </ul>
        </nav>
    );
}