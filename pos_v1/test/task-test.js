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
