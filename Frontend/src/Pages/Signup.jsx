import Auth from '../Components/Auth'
import Quote from '../Components/Quote';

export default function Signup() {
    return (
        <>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
            <div>
                <Auth type='signup'/>
            </div>
            <div className='hidden lg:block'>
                <Quote/>
            </div>
        
        </div>
        
        </>
    )
}