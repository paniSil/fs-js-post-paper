const About = () => {
  return (
    <div className="container-main--paddings">
      <h2>About</h2>
      <div>
        <p>
          THE POST PAPER is Fullstack JavaScript Project dedicated to building
          clean blogging / article platform that mimics nespaper layout.
        </p>
        <p>
          It consists of two parts - frontend client is built with React Vite,
          Typescript and SCSS, and backend server made with Express.JS and
          Mongoose was used for building server side.
        </p>
        <p>
          <b>Note*:</b> some functions are still a bit simplified or in
          development. For example, covers and avatars are using links instead
          of files and comments section will be implented in the future.
        </p>
      </div>
    </div>
  );
};

export default About;
