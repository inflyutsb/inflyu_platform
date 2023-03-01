// import { useState } from "react";
// import './autocomplete.scss';
// // import { useSelector, useDispatch } from "react-redux";
// // import { addInfluencer } from '../../Store/actions/addInfluencer';

// const AutoComplete = ({ data }) => {

//     // const influencer = useSelector((state) => state.influencerReducer);
//     // const dispatch = useDispatch();
//     const [suggestions, setSuggestions] = useState([]);
//     const [suggestionIndex, setSuggestionIndex] = useState(0);
//     const [suggestionsActive, setSuggestionsActive] = useState(false);
//     const [value, setValue] = useState('');

//     const handleChange = (e) => {
//         const query = e.target.value.toLowerCase();
//         setValue(query);
//         if (query.length > 2) {
//             const filterSuggestions = data.filter(
//                 (suggestion) =>
//                     suggestion.toLowerCase().indexOf(query) > -1
//             );
//             setSuggestions(filterSuggestions);
//             setSuggestionsActive(true);
//         } else {
//             setSuggestionsActive(false);
//         }
//     };

//     const handleClick = (e) => {
//         setSuggestions([]);
//         // dispatch(addInfluencer(value))
//         setValue(e.target.innerText);
//         setSuggestionsActive(false);
//     };

//     //   const handleKeyDown = (e) => {
//     //     // UP ARROW
//     //     if (e.keyCode === 38) {
//     //       if (suggestionIndex === 0) {
//     //         return;
//     //       }
//     //       setSuggestionIndex(suggestionIndex - 1);
//     //     }
//     //     // DOWN ARROW
//     //     else if (e.keyCode === 40) {
//     //       if (suggestionIndex - 1 === suggestions.length) {
//     //         return;
//     //       }
//     //       setSuggestionIndex(suggestionIndex + 1);
//     //     }
//     //     // ENTER
//     //     else if (e.keyCode === 13) {
//     //       setValue(suggestions[suggestionIndex]);
//     //       setSuggestionIndex(0);
//     //       setSuggestionsActive(false);
//     //     }
//     //   };

//     const Suggestions = () => {
//         return (
//             <div className="suggestions">
//                 {suggestions.map((suggestion, index) => {
//                     return (
//                         <div
//                             className={index === suggestionIndex ? "active" : ""}
//                             key={index}
//                             onClick={handleClick}
//                         >
//                             {suggestion}
//                         </div>
//                     );
//                 })}
//             </div>
//         );
//     };

//     return (
//         <div className="autocomplete">
//             <input
//                 type="text"
//                 value={value}
//                 onChange={handleChange}
//             // onKeyDown={handleKeyDown}
//             />
//             {suggestionsActive && <Suggestions />}
//         </div>
//     );

// };

// export default AutoComplete;