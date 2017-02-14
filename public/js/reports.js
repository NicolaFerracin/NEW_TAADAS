(function(){
    
    var months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    $.getJSON('/ordersStats',function(data){
        
        
        var types = {};
        
        data.some(function(o) {
            
            
            o.created = o.created.split('T')[0];
            
            var r = types[o.type];
            if (!r) {
                r = {};
                types[o.type] = r;
            }
            
            var d = r[o.created];
            if (!d) {
                d = {count:0, month:o.created.split('-')[1]};
                r[o.created] = d;
            }
            d.count+=o.count;
            
            
        });
        
        
        var e = $('#reports');
        
        var k = Object.keys(types);
        k.some(function (key) {
            
            e.append(('<h2>'+key.toUpperCase()+'S</h2><hr>'));
            var type = types[key];
            
            var dkeys = Object.keys(type);
            dkeys.sort(function (a,b) {
                return a-b;
            });
            
            var prevMonth;
            var monthTotal = 0;
            
            dkeys.some(function(dkey){
                var day = type[dkey];
                
                if (prevMonth && day.month !== prevMonth) {
                    e.append('<div class="row"><div class="col-lg-4"><h4><b>'+months[parseInt(prevMonth)]+' total:</b></div><div class="col-lg-8">'+monthTotal+'</h4></div></div><hr>');
                    monthTotal = 0;
                }
                if (!prevMonth || (day.month !== prevMonth)) {
                     e.append('<h3><b>'+months[parseInt(day.month)]+'</b></h3>');
                }
                
                prevMonth = day.month;
                
                
                monthTotal += day.count;
                e.append('<div class="row"><div class="col-lg-4"><b>'+dkey+':</b></div><div class="col-lg-8">'+day.count+'</div></div>');
            });
            e.append('<div class="row"><div class="col-lg-4"><h4><b>'+months[parseInt(prevMonth)]+' temporary total:</b></div><div class="col-lg-8"><b>'+monthTotal+'</b></h4></div></div><hr>');
            
            
            
            
        })
        
        
        
        
        
    });
    
})();