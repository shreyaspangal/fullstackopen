import Part from './Part';

const Content = ({ parts }) => {
    return (
        <>
            <Part data={parts[0]} />
            <Part data={parts[1]} />
            <Part data={parts[2]} />
        </>
    )
}

export default Content;