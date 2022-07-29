//applying opacity and line when item is checked off the list 
export const checkedOffList = (e) => {
  if (e.currentTarget.style.opacity) {
    e.currentTarget.style.opacity = null;
    e.currentTarget.style.textDecoration = null;
  } else {
    e.currentTarget.style.opacity = '0.5';
    e.currentTarget.style.textDecoration = 'line-through';
  }
  e.currentTarget.classList.toggle('my-class-1', 'my-class-2');
};