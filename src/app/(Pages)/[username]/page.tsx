import React from 'react'



const page = ({ params }: { params: { username: string } }): JSX.Element => {
  return (
    <div>
      {params.username}
    </div>
  );
};

export default page
