import { Link } from 'react-router-dom';
import ShareModal from './ParamsModal';

const SideMenu = () => {
    return (
        <div className="flex w-full h-20 flex-wrap items-start flex-col px-12 justify-center rounded-b-2xl">
            <Link to="/" className='w-1/2'><h1 className="font-bold text-2xl uppercase">Le Petit Projet - Dashboard</h1></Link>
            <ShareModal />
        </div>
    );
};

export default SideMenu;