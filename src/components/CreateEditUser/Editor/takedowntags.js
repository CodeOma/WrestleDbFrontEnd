//   takedown: {
//     type: String,
//     required: true,
//   },
//   position: {
//     type: String,
//     required: true,
//     enum: ["standing", "ground"],
//   },
//   type: {
//     type: String,
//     required: true,
//     enum: ["Upper-Body", "Lower-Body", "Other"],
//   },
//   offdef: {
//     type: String,
//     required: true,
//     enum: ["offensive", "defensive", "other"],
//   },

const tds = {
  Offensive: {
    standing: {
      upperBody: [],
      lowerBody: [],
      throw: [],
      other: [],
    },
    ground: [],
  },
  defensive: {},
};

const td = {
  Offensive: {
    standing: {
      upperBody: [
        "Slide-by",
        "Duck Under",
        "Push-out",
        "Underhook-Throwby",
        "Snap Go behind",
        "Go behind",
        "Front Headlock",
        "Arm-Drag",
        "Shuck",
        "Body-Lock",
      ],

      lowerBody: [
        "Single Leg",
        "Double Leg",
        "High-Crotch",
        "Outside-Reach High-Crotch",
        "Other Legshot",
        "Outside-Step High-Crotch",
        "Ankle-pick",
        "Scramble",
        "Low-Single",
        "Counter",
        "Head-outside Low-Single",
        "Foot Sweep",
      ],
      throw: [
        "Inside-Trip",
        "Fireman's",
        "Outside Fireman's",
        "Shoulder-Throw",
        "Headlock",
        "OverUnder",
        "Front-headlock",
        "Suplex",
        "Other Throw",
      ],
      other: ["Caution", "Passivity(Shot-Clock)", "Denied Challenge"],
    },
    ground: [
      "Cross Ankles",
      "Gut Wrench",
      "High gutwrench",
      "Low gutwrench",
      "Ground Other",
      "Takedown Turn",
      "Tilt",
    ],
  },
  defensive: {},
};

td.forEach(m => {
  if (m.position === "standing") {
    tds[m.offdef][m.position][m.type].push(m.name);
  }
});
console.log(tds);

const setups = [
  "Arm-Drag",
  "Clearing ties",
  "Collar-Tie",
  "Counter",
  "Elbow-Tie",
  "Fake",
  "From Space",
  "Front Headlock",
  "Inside Tie",
  "Multiple Offensive Attempts",
  "Off whistle",
  "Outside tie",
  "Overtie",
  "Overhook",
  "Over Under",
  "Off Opponent Snap",
  "Post",
  "Reach and Go",
  "Reversal",
  "Scramble",
  "Seatbelt",

  "Snap",
  "Shuck",
  "Slide-by",
  "Wrists",
  "Underhook",
  "2 on 1",
  "By Zone",
];
//}
//   label={"Setup/Tags"}
// />

//         : [
//             "Go behind",
//             "Chestwrap",
//             "Re-shot",
//             "Tilts",
//             "Far Ankle",
//             "Front Headlock",
//             "Counter",
//             "Olympic Lift",
//             "Scramble",
//             "Step Over",
//             "Switch lift",
//             "Whizzer",
//           ]
//     }
//     label={"Scoring"}
//   />
//   {timestamp.takedown.offdef !== "Other" && (
//     <Select
//       state={timestamp.takedown}
//       fn={setTimestamp}
//       name={"oppDefendedShot"}
//       onChange={onSelectorChange}
//       options={[
//         "Push-out",
//         "Underhook-Throwby",
//         "Go behind",
//         "Front Headlock",
//         "Slide-by",
//         "Body-Lock",

//         "Single Leg",
//         "Double Leg",
//         "High-Crotch",
//         "Outside-Reach High-Crotch",
//         "Outside-Step High-Crotch",
//         "Ankle-pick",
//         "Scramble",
//         "Low-Single",
//         "Counter",
//         "Head-outside Low-Single",
//         "Other Legshot",

//         "Inside-Trip",
//         "Fireman's",
//         "Outside Fireman's",
//         "Shoulder-Throw",
//         "Headlock",
//         "OverUnder",
//         "Front-headlock",
//         "Step Over",

//         "Other Throw",
//       ]}
//       label={"Countered takedown"}
//     />
//   )}
// </>
// )}
