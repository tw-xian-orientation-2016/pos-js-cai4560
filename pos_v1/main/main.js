//TODO: Please write code in this file.
function loadAllBarcodes(inputs) {
  var result = [];
  for(var i=0; i < inputs.length; i++)
    {
      var location = inputs[i].indexOf('-');
      if(location == -1)
      {
        var flag = staticsNumber(inputs,i);
        result.push({barcode:inputs[i], number:flag-i});
        i=flag-1;
      }
      else
        result.push(calculateNumber(inputs,i,location));
    }
  return result;
}

function staticsNumber(inputs, i) {
  for(var j=i; j<inputs.length; j++)
  {
    if(inputs[j] === inputs[i])
      continue;
    else
      break;
  }
  return j;
}

function calculateNumber(inputs,i,location)
{
  tempbarcode = inputs[i].substr(0,location);
  count = parseInt(inputs[i].substr(location+1,inputs.length));
  return {barcode:tempbarcode, number:count};
}

function marchBarcodeList(inputs) {
  var result = [];
  var item = loadAllItems();
  for(var i=0; i<inputs.length; i++)
    for(var j=0; j<item.length; j++)
    {
      if(inputs[i].barcode === item[j].barcode)
        result.push(copyData(inputs[i],item[j]))
    }
  return result;
}

function copyData(barcodeinfo,iteminfo)
{
  return {item:{barcode: iteminfo.barcode,
                name: iteminfo.name,
                unit: iteminfo.unit,
                price: iteminfo.price
              },
          number:barcodeinfo.number};
}

function calculatePromotion(inputs) {
  var result = [];
  var promotions = loadPromotions();
  var flag;
  for(var i=0; i<inputs.length; i++)
  {
    flag = 0;
    for(var j=0; j<promotions.length;j++)
      for(var k=0; k<promotions[j].barcodes.length; k++)
        if(inputs[i].item.barcode === promotions[j].barcodes[k])
        {
          result.push(calculateTotalPrice(inputs[i]));
          flag = 1;
          break;
        }
    if(!flag)
      result.push({cartitem:inputs[i],total:inputs[i].item.price*inputs[i].number,save:0.00})
  }
  return result;
}

function calculateTotalPrice(input) {
  var promote = parseInt(input.number/3);
  return {cartitem:input,total:input.item.price*(input.number-promote),save:input.item.price*promote};
}
