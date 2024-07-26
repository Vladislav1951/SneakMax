const RangeSlider = document.getElementById('range-slider');

if (RangeSlider){
    noUiSlider.create(RangeSlider, {
        start: [500, 999999],
        connect: true,
        step: 1,
        range: {
            'min': [500],
            'max': [200000]
        }
    });

    const input0 = document.getElementById('input0');
    const input1 = document.getElementById('input1');
    const inputs = [input0, input1];

    RangeSlider.noUiSlider.on('update', function(values, handle){
        inputs[handle].value = Math.round(values[handle]);
    });

    const setRangeSlider = (i, value) => {
        let array = [null, null];
        array[i] = value;
        RangeSlider.noUiSlider.set(array)
    };

    inputs.forEach((el, index) => {
        el.addEventListener('change', (e) => {
            setRangeSlider(index, e.currentTarget.value)
        });
    });
}