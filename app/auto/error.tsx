'use client';

const MyError = ({error}: {error: Error}) => {
  return (
    <h1>
        Ooooops! {error.message} 
    </h1>
  )
}

export default MyError