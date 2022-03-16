import React from "react";

const UplaodForm = () => {
  return (
    <form>
      <label htmlFor="image">사진</label>
      <input id="image" type="file" />
      <button type="submit">업로드</button>
    </form>
  );
};

export default UplaodForm;
