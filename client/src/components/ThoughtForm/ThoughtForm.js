import { useState } from "react";

const ThoughtForm = () => {
    const [ thoughtText, setText ] = useState('');

    const handleChange = (e) => {
        if (e.target.value.length < 281) {
            setText(e.target.value);
        }
    }

    const handleFormSubmit = async e => {
        e.preventDefault();
        setText('');
    }

    const characterCount = thoughtText.length;

    return (
        <div>
            <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280
            </p>
            <form className="flex-row justify-center justify-space-between-md align-stretch" onSubmit={handleFormSubmit}>
                <textarea
                placeholder="Here's a new thought..."
                value={thoughtText}
                onChange={handleChange}
                className="form-input col-12 col-md-9"
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ThoughtForm;