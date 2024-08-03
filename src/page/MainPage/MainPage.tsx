import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";
import { iColumns, iRows } from "../../interfaces";
import style from '../MainPage/style.module.scss'

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBoolean(): boolean {
    return Math.random() >= 0.5;
}

async function generateColumns(): Promise<iColumns> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const numColumns: number = getRandomInt(2, 100);
    const objColumns: iColumns = {};

    for (let i = 0; i < numColumns; i++) {
        objColumns[i] = i === 0 ? `` : `Обработка${i}`;
    }

    return objColumns;
}

async function generateRows(numColumns: number): Promise<iRows> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const numRows: number = getRandomInt(2, 100);

    const rows: iRows = {};

    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
        rows[rowIndex] = Array.from({ length: numColumns }, (_, colIndex) =>
            colIndex === 0 ? `Заказ` : getRandomBoolean()
        );
    }

    return rows;
}

const MainPage: React.FC = () => {
    const [columns, setColumns] = useState<string[]>([]);
    const [rows, setRows] = useState<Array<Array<boolean | string>>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const cols = await generateColumns();
            const ArrayColumns = Object.values(cols);
            setColumns(ArrayColumns);

            const data = await generateRows(ArrayColumns.length);
            const ArrayRows = Object.values(data);
            setRows(ArrayRows);

            setLoading(false)
        };

        fetchData();
    }, []);

    const addRow = () => {
        const newRow = Array.from({ length: columns.length }, (_, colIndex) =>
            colIndex === 0 ? `Заказ` : getRandomBoolean()
        );
        setRows([...rows, newRow]);
        alert('Новая строка добавлена')
    };

    const deleteRow = () => {
        setRows(prevArray => prevArray.slice(0, -1));
        setIsModalOpen(false)
        alert('Последняя строка была удалена')
    };

    return (
        <>
            <Header />

            {isModalOpen ? (
                <div className={style.wrapperModal}>
                    <div className={style.modal}>
                        <p>Вы уверены, что хотите удалить строку?</p>
                        <div className={style.confirm}>
                            <button onClick={deleteRow}>Да</button>
                            <button onClick={() => setIsModalOpen(false)}>Отмена</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={style.wrapperButtons}>
                    <button onClick={addRow}>Добавить строку</button>
                    <button onClick={() => setIsModalOpen(true)}>Удалить строку</button>
                </div>
            )}

            <Table rows={rows} columns={columns} loading={loading} setRows={setRows} />
        </>
    );
}

export default MainPage;