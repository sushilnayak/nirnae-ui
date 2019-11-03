import { createContext } from "react";

export const applicationContextDefaultValue = {
  darkMode: false
};

const ApplicationContext = createContext([{}, () => {
}]);

export default ApplicationContext;
