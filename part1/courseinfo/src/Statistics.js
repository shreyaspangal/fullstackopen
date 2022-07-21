import StatisticsLine from "./StatisticsLine";

const Statistics = ({ stats }) => {
    if (stats.total === 0) {
        return (
            <p>No feedback given</p>
        )
    }

    return (
        <table>
            <tbody>
                <tr><StatisticsLine text="good" stat={stats.good} /></tr>
                <tr><StatisticsLine text="neutral" stat={stats.neutral} /></tr>
                <tr><StatisticsLine text="bad" stat={stats.bad} /></tr>
                <tr><StatisticsLine text="all" stat={stats.total} /></tr>
                <tr><StatisticsLine text="average" stat={stats.average} /></tr>
                <tr><StatisticsLine text="positive" stat={stats.positivesPercentage} /></tr>
            </tbody>
        </table>
    )
}

export default Statistics;