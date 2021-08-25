import { useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import { ADD_REACTION } from "../../utils/mutations";

const ReactionForm = ({thoughtId}) => {
    const [ reactionText, setReactionText ] = useState('');

    const [ addReaction, { error } ] = useMutation(ADD_REACTION);

    const handleChange = async e => {
        if (e.target.value.length <= 280) {
            setReactionText(e.target.value);
        }
    }

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            await addReaction({
                variables: {reactionBody: reactionText, thoughtId}
            })
            setReactionText('');
        } catch (e) {
            console.error(e);
        }
    }

    const characterCount = reactionText.length;
    return (
        <div>
            <p className={`m-0 ${characterCount === 280 && 'text-error'}`}>
                Character Count: {characterCount}/280 {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form className="flex-row justify-center justify-space-between-md align-stretch" onSubmit={handleFormSubmit}>
                <textarea
                placeholder="Leave a reaction to this thought..."
                className="form-input col-12 col-md-9"
                onChange={handleChange}
                value={reactionText}
                ></textarea>

                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ReactionForm;
