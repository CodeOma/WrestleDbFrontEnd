// import React, { Component, useState, useEffect } from "react";
// import { Grid } from "@material-ui/core";

// const Autocomplete = ({ databaseFunction }) => {
//   // const { tournaments } = useGlobalContext();
//   const [data, setData] = useState([]);
//   const [suggestion, setSuggestion] = useState([]);
//   const [wrestName, setWrestName] = useState();
//   const [fetchedData, setFetchedData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [filters, setFilters] = useState([]);
//   const [filterOptions, setFilterOptions] = useState({});
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const set = async () => {
//       const fetch = await databaseFunction(search);
//       setSuggestion(fetch);
//     };
//     set();
//   }, [search]);

//   const renderResults = () => {
//     try {
//       if (suggestion.length === 0) {
//         return null;
//       }
//       return (
//         isOpen && (
//           <Grid className='px-1'>
//             <p className='d-flex flex-row'>
//               <i>results:</i>
//             </p>
//             <ul
//               className='justify-content-center'
//               style={{ listStyleType: "none", paddingLeft: 0, border: "1px" }}
//             >
//               {suggestion.map(item => (
//                 <li
//                   style={{ fontSize: "14px", cursor: "pointer" }}
//                   onClick={() => {
//                     setData(item.id);
//                     setSearch(item.title);
//                     setIsOpen(false);
//                     console.log(data);
//                   }}
//                 >
//                   {item.title}
//                 </li>
//               ))}
//             </ul>
//           </Grid>
//         )
//       );
//     } catch (error) {}
//   };

//   useEffect(() => {
//     const fetchInfo = async getFunc => {
//       const fetch = await getFunc(data, selectedFilters, page);
//       console.log(fetch);
//       setFetchedData(fetch.data.matches);
//       setFilterOptions(fetch.data.filters);
//       setWrestName(fetch.data.matches[0]?.teamName);
//     };

//     const getData = async () => {
//       try {
//         fetchInfo(getMatchByTeam);
//       } catch (e) {
//         console.log(e);
//       }
//     };

//     getData();
//   }, [data, selectedFilters, page]);

//   return (
//     <Grid
//       direction='column'
//       className='d-flex'
//       container
//       className='pl-3 pr-4 pt-2'
//     >
//       <Grid className='pt-4'>
//         <div>
//           <input
//             value={search}
//             placeholder={`Search by ${searchTopic}`}
//             onChange={e => {
//               setSearch(e.target.value);
//               setIsOpen(true);
//             }}
//             style={{
//               padding: "5px",

//               marginTop: "10px",
//               width: "100%",
//             }}
//           />
//           {renderResults()}
//         </div>
//         {/* <Selector options={[""]} label={"Weight Class"} /> */}
//       </Grid>
//     </Grid>
//   );
// };
