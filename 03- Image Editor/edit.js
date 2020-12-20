
    
    const store = document.querySelectorAll('.controls input');

    function edit()
    {
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }

    //event listeners
    store.forEach(input =>
    input.addEventListener('change',edit) 
    );

    store.forEach(input =>
    input.addEventListener('mousemove', edit) 
    );
  
 