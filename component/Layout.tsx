import React, { ReactNode } from 'react'
import Header from './Header';

type Props = {
    children:ReactNode;
}

const Layout: React.FC<Props> = (props) => (
    <section>
        <Header/>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-10 lg:px-20 mt-10'>
            {props.children}
        </div>
    </section>
)

export default Layout