import style from '../Header/style.module.scss'

const Header: React.FC = () => {

    return (
        <header className={style.header}>
            <h1>Таблица заказов и обработок</h1>
        </header>
    );
}

export default Header;