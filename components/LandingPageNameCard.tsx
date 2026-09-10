export default function NameCard(){
  return(
    <div className="h-full flex flex-col justify-center">
      <div className='w-full flex flex-col font-extrabold items-center justify-center'>
        <h1 className='text-[65px] leading-tight sm:text-[100px] tracking-tight sm:tracking-[25px] lg:tracking-[35px]'>Vincent</h1>
        <h1 className='text-[125px] leading-tight sm:text-[225px]'>DAO</h1>

        {/* Add portrait image behind */}
      </div>
      <div className="w-full px-4">
        <p className='text-center text-sm text-[var(--text-muted)]'>
          A Full-Stack Developer specialising in creating interactive and modern web experiences!
        </p>
      </div>
    </div>
  );
}