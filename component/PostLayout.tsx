import React, { ReactNode } from 'react'
import Header from './Header';

type Props = {
    children:ReactNode;
}

const PostLayout: React.FC<Props> = (props) => (
    <section>
        <Header/>
        <div className='px-10 lg:px-20 mt-10'>
            {props.children}
        </div>
    </section>
)

export default PostLayout