export default function Button({title, onClick}) {
    return (
      <button onClick={onClick} className='bg-orange-400 w-xs h-10 rounded-lg text-white hover: cursor-pointer'>{title}</button>
    )
  }