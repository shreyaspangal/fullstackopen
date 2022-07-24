import Part from './Part';

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part => <Part data={part} key={part.id} />)}
        </>
    )
}

export default Content;