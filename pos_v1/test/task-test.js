describe('loadAllItems', function() {
  var allItems;
  var inputs;

  beforeEach(function() {
    allItems = loadAllItems();
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
  });

  it('Should return correct barcodelist', function() {

    var result = loadAllBarcodes(inputs);
    var expectresult = [{barcode:"ITEM000001",number:5},
                  {barcode:"ITEM000003",number:2},
                  {barcode:"ITEM000005",number:3}
                 ];
    expect(result).toEqual(expectresult);
  });
});



describe('marchBarcodeList', function() {
  var inputs = [{barcode:"ITEM000001",number:5},
                {barcode:"ITEM000003",number:2},
                {barcode:"ITEM000005",number:3}];

  it('Should return correct cartitem', function() {

    var result = marchBarcodeList(inputs);
    var expectresult = [
                        {item: {
                              barcode: 'ITEM000001',
                              name: '雪碧',
                              unit: '瓶',
                              price: 3.00
                            },number:5},
                        {item: {
                              barcode: 'ITEM000003',
                              name: '荔枝',
                              unit: '斤',
                              price: 15.00
                            },number:2},
                        {item:{
                              barcode: 'ITEM000005',
                              name: '方便面',
                              unit: '袋',
                              price: 4.50
                            },number:3}];
    expect(result).toEqual(expectresult);
  });
});
