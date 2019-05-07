 function print_r(thevar, origname)
    {
        var print=function(key,item)
        {
            var html='';
            key && key.indexOf('[') == -1?  key += ' : ' :key = '';

            var t=Object.prototype.toString.call(item);
            t = t.substr(8,t.length-9);
            switch(t)
            {
                case 'String':
                    if(item.indexOf('{') != -1){
                        var obj = JSON.parse(item);
                        html+=key+'<b>{</b><ul style="list-style:none">';
                        for (c in obj)
                        {
                            html+='<li>';
                            html+=print(''+c,obj[c])+',';
                            html+='</li>';
                        }
                        html+='</ul><b>}</b>';
                        break;
                    }
                case 'Date':
                    html+= key+' "'+item.toString().replace('"','\\"')+'"';
                    break;
                case 'Number':
                case 'RegExp':
                case 'Boolean':
                    html+=key +'  '+item;
                    break;
                case 'Null':
                case 'Undefined':
                    html+=key;
                    break;
                case 'Array':
                    html+=key+'[<ul style="list-style:none">';
                    for (c in item)
                    {
                        html+='<li>';
                        html+=print('['+c+']',item[c])+',';
                        html+='</li>';
                    }
                    html+='</ul>]';
                    break;
                case 'Object':
                    html+=key+'<b>{</b><ul style="list-style:none">';
                    for (c in item)
                    {
                        html+='<li>';
                        html+=print(''+c,item[c])+',';
                        html+='</li>';
                    }
                    html+='</ul><b>}</b>';
                    break;
                case 'Function':
                    html+=key+' = '+item.toString().substr(0,item.toString().indexOf('{'));
                    html+='<b>{</b><ul style="list-style:none">';
                    html+='<li>Arguments: '+item.length+'</li>';
                    html+='</ul><b>}</b>';
                    break;
                default:
                    html+='>><<'+key;
                    break;
            }
            return html;
        };

        return '<ul style="list-style:none"><li>'+print(origname,thevar)+'</li></ul>';
    }
