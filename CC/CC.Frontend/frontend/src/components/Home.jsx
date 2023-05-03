import React from 'react';

const R_URL = 'http://localhost:3000/api/Auth/GetTestUser';

const Home = () => {
  const handleClick = async (e) => {
    e.preventDefault();
  try {
    const response = await fetch(R_URL);
    console.log("POST");
    if (!response.ok) throw Error(response.status)
    else {
      const body = await response.json();
      console.log(body);
    }
  } catch (error) {
    console.log(error);
  }
}

  return (
    <div>
      <h2 onClick={handleClick}>Home</h2>
      <section>
        example text
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id lorem sit amet sem vestibulum eleifend et et tellus. 
          In hac habitasse platea dictumst. Integer in iaculis justo. Sed quis gravida est, id suscipit arcu. 
          Ut faucibus ipsum ipsum, quis tempor lectus condimentum in. Nunc posuere, odio quis rutrum vehicula, 
          tellus lacus varius diam, sit amet auctor quam orci imperdiet sem. In vestibulum mi sed dui condimentum pulvinar. 
          Duis facilisis tempus interdum. Cras ac cursus nulla. Cras mollis dolor et ligula sagittis, nec gravida nisl congue. 
          Aenean gravida nibh ligula, nec ullamcorper sapien laoreet nec. Sed et dolor sit amet turpis imperdiet consequat. 
          Etiam mollis tincidunt leo sit amet ullamcorper.
        </p>
      </section>
    </div>
  )
};

export default Home;
