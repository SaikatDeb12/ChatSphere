interface heading {
    label: string;
    color: string;
}

const Heading: React.FC<heading> = ({ label, color }) => {
    return <div className={`font-bold ${color} text-4xl pt-6`}>{label}</div>;
};

export default Heading;
