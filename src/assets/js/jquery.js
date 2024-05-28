$(document).ready(()=> {
  function backTop() {
    const btnBackTop = $('.back-top');
    $(document).scrollTop() > 400 ? btnBackTop.show().css('opacity', '1') : btnBackTop.hide().css('opacity', '0');
    $(window).scroll(()=> {
      let y = $(document).scrollTop();
      y ? btnBackTop.show().css('opacity', '1') : btnBackTop.hide().css('opacity', '0');
    });
    btnBackTop.click(()=> {
      $('html, body').animate({scrollTop:0}, 1000)
    })
  }
  backTop();

  $("#price-slider").slider({
    range: true,
    min: 1000,
    max: 10000000,
    step: 1,
    values: [1000, 10000000],
    slide: function(event, ui) {
      $("#min-price").val(ui.values[0]);
      $("#max-price").val(ui.values[1]);
      $("#min-price-show").val(ui.values[0].toLocaleString('it-IT', {style : 'currency', currency : 'vnd'}));
      $("#max-price-show").val(ui.values[1].toLocaleString('it-IT', {style : 'currency', currency : 'vnd'}));
    }
  });
  $("#min-price").val($("#price-slider").slider("values", 0));
  $("#max-price").val($("#price-slider").slider("values", 1));
  $("#min-price-show").val($("#price-slider").slider("values", 0).toLocaleString('it-IT', {style : 'currency', currency : 'vnd'}));
  $("#max-price-show").val($("#price-slider").slider("values", 1).toLocaleString('it-IT', {style : 'currency', currency : 'vnd'}));
});

