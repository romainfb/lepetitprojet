import { Link } from 'react-router-dom';

const SideMenu = () => {
    return (
        <div className="flex w-full h-20 flex-wrap items-start flex-col px-12 justify-center rounded-b-2xl">
            <Link to="/"><h1 className="font-bold text-2xl uppercase">Le Petit Projet - Dashboard</h1></Link>
        </div>
    );
};

export default SideMenu;