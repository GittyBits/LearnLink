import React, { useState } from 'react';
import TopNav from './topnav';
import SideNav from './sidenav';

function Header() {
const [sideNavOpen, setSideNavOpen] = useState(false);

// Toggle the sidebar open/close
const toggleNav = () => {
setSideNavOpen(!sideNavOpen);
};

return (
<>
    {/* Top Navigation */}
    <TopNav toggleNav={toggleNav} />

    {/* Side Navigation */}
    <SideNav isOpen={sideNavOpen} />
</>
);
}

export default Header;
