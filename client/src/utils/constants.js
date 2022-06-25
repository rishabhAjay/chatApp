export const drawerWidth = 250;

export const avatarLetters = (avatarName) => {
  if (avatarName) {
    const fullName = avatarName.split(" ");
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return initials.toUpperCase();
  }
};

export const concatUID = (uid1, uid2) => {
  if (uid1 < uid2) {
    return uid1 + uid2;
  } else {
    return uid2 + uid1;
  }
};

export const titleCase = (name) => {
  return name.replace(/^./, name[0].toUpperCase());
};
