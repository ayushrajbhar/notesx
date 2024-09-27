import React from 'react'

const Form = () => {
  return (
    <div>
      <form onSubmit={(x)}>
        <label htmlFor="name">Name:</label>
        <input id='name' name='name' type="text" placeholder='Enter your name' value={a} onChange={y} />
        <br />
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="text" placeholder='Enter your name' value={a} onChange={y} />
        <br />
        <input type="submit" />
      </form>
    </div>
  )
}

export default Form
