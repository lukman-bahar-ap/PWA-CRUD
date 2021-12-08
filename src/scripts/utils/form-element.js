const FormElement = {
  _eyeVisibility(element) {
    const { inputElm, eyeElm } = element;
    // toggle the type attribute condition
    const visibilityPass = inputElm.getAttribute('type') === 'password'
      ? { type: 'text', icon: 'visibility_off' } : { type: 'password', icon: 'visibility' };

    // toggle the eye / eye slash icon
    inputElm.setAttribute('type', visibilityPass.type);
    eyeElm.innerText = visibilityPass.icon;
  },
};

export default FormElement;
