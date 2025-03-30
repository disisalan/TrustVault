export default function Content({title, placeholder, type, onChange}) {
    return (
      <div>
          <div className='flex justify-start font-bold rounded-sm'>
          {title}
          </div>
          
          <div>
              
              <input className='border border-orange-400 rounded-lg w-xs h-10 pl-2 hover:bg-white hover:border-orange-500'  type={type} placeholder={placeholder} onChange={onChange}/>
          </div>
      </div>
    )
  }