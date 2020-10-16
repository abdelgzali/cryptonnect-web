import React, { useState, useEffect } from 'react';

function Friendslist({ Friends }) {
  useEffect(() => {
    console.log(Friends);
  }, []);

  const imgStyles = (url) => {
    return {
      backgroundImage: `url(${url})`,
      backgroundSize: 'auto 100px',
      backgroundPosition: 'center',
    };
  };
  return (
    <section>
      <h3>Friends</h3>
      <div className="x-scroll">
      <span id="friends-list-start"></span>
        {Friends &&
          Friends.length &&
          Friends.map((friend) => {
            return (
              <div className="friend">
                <figure>
                  <div
                    className="friend-avatar"
                    style={imgStyles(friend.photoURL)}
                  >
                  </div>
                  <figcaption>
                    <p>{friend.name.split(/ (.*)/)[0]}</p>
                  </figcaption>
                </figure>
              </div>
            );
          })}
        <a href="#friends-list-start" className="list-end">
          <span className="material-icons">keyboard_backspace</span>
        </a>
      </div>
      <span className="fade-spacer"></span>
    </section>
  );
}

export default Friendslist;
