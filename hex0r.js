		var HEX = '0123456789ABCDEF'

		function dec2_to_hex(dec)
		{
			if (dec < 0)
				dec = 0
			
			if (dec > 255)
				dec = 255
			
			return HEX.charAt(Math.floor(dec / 16)) + HEX.charAt(dec % 16)
		}
		
		function dec_to_hex8(dec)
		{
			var str = ""
			
			for (var i = 3; i >= 0; i--)
			{
				str += dec2_to_hex((dec >> (i*8)) & 255)
			}
			
			return str;
		}

		function remove_whitespace(str)
		{
			return str.replace(/\n/g, "")
					  .replace(/\t/g, "")
					  .replace(/ /g, "")
					  .replace(/\r/g, "")
		}
		
		var BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
		 
		function base64_decode(encoded)
		{
			var decoded = ""
			
			for (var i = 0; i < encoded.length; i += 4)
			{
				var ch0 = encoded.charAt(i+0)
				var ch1 = encoded.charAt(i+1)
				var ch2 = encoded.charAt(i+2)
				var ch3 = encoded.charAt(i+3)
				
				var index0 = BASE64_CHARS.indexOf(ch0);
				var index1 = BASE64_CHARS.indexOf(ch1);
				var index2 = BASE64_CHARS.indexOf(ch2);
				var index3 = BASE64_CHARS.indexOf(ch3);
				
				decoded += String.fromCharCode((index0 << 2) | (index1 >> 4))
				decoded += String.fromCharCode(((index1 & 15) << 4) | (index2 >> 2))
				decoded += String.fromCharCode(((index2 & 3) << 6) | index3)
			}
			
			return decoded
		}
		
		function markup_hex0rwindow(div, index)
		{
			var bin_data = base64_decode(remove_whitespace(div.text()))
			var line_data
			var title = div.attr("title")
			
			var highlights_str = $("form#hex0rwindow_params input[name='highlights']", div).attr("value").split(',')
			var highlights = []
			
			for (var i = 0; i < highlights_str.length; i++)
			{
				highlights.push(highlights_str[i].split(":"))
			}
			 
			var params = title.split(':')
			var step = parseInt($("form#hex0rwindow_params input[name='row_width']", div).attr("value"))
			var word_size = parseInt($("form#hex0rwindow_params input[name='word_size']", div).attr("value"))
			var row_break = parseInt($("form#hex0rwindow_params input[name='row_break']", div).attr("value"))
			var caption = $("form#hex0rwindow_params input[name='caption']", div).attr("value")
			
			div.text("")
			div.append("<table></table>")
			
			var offset = 0

			function apply_highlights(index)
			{
				for (var j = 0; j < highlights.length; j++)
				{
					if ((index >= highlights[j][0]) && (index <= highlights[j][1]))
					{
						if (index == highlights[j][0])
						{
							$("table tr td:last", div).addClass("hex0rerwindow_border_start")
						}
						
						if (index == highlights[j][1])
						{
							$("table tr td:last", div).addClass("hex0rerwindow_border_end")
						}
						
						$("table tr td:last", div).addClass("hex0rerwindow_code_hi hex0rerwindow_border_middle")
						$("table tr td:last", div).attr("style", "background-color: " + highlights[j][2] + ";")
						$("table tr td:last", div).attr("title", highlights[j][3])
						
						runlen += 1
					}
					else
					{
						$("table tr td:last", div).addClass("hex0rerwindow_code")
					}
				}
			}

			if (caption)
				$("table", div).append("<caption>" + caption + "</caption>")
				
			while (bin_data.length > 0)
			{
				line_data = bin_data.slice(0, step)
				bin_data = bin_data.slice(step)
			
				$("table", div).addClass("hex0rerwindow_table")
				$("table", div).append("<tr></tr>").addClass("hex0rerwindow")
				$("table tr:last", div).append("<td>" + dec_to_hex8(offset) + " </td>")
				/*$("table tr:last", div).append("<td>0x" + dec_to_hex8(offset) + "</td>")*/
				$("table tr td:last", div).addClass("hex0rerwindow_offset")
				
				var runlen = 0
				
				for (var i = 0; i < line_data.length; i += word_size)
				{
					var num = ""
					
					for (var j = 0; j < word_size; j++)
					{
						num += dec2_to_hex(line_data.charCodeAt(i+j))
					}
                    if (i == row_break - 1)
                    {
					$("table tr:last", div).append("<td>" + num + "&nbsp;&nbsp;&nbsp</td>")

					apply_highlights(offset+i)

                    }
                    else
                    {
					$("table tr:last", div).append("<td>" + num + " </td>")

					apply_highlights(offset+i)
                    }
				}
				
				var text = ""
				
				for (var i = 0; i < line_data.length; i++)
				{
					var cc = line_data.charCodeAt(i)
					
					if ((cc >= 32) && (cc <= 126))
					{
						text = text + line_data.charAt(i)
					}
					else
					{
						text = text + "."
					}
				}
				
				if (line_data.length < step)
					$("table tr td:last", div).attr("colspan", Math.floor((step - line_data.length) / word_size) + 1)

				offset += step
				
				$("table tr:last", div).append("<td>" + text + "</td>")
				$("table tr td:last", div).addClass("hex0rerwindow_visual")
			}
		}
		
		$(document).ready(function () {
			$("div.hex0rwindow").each(function (index) {
				markup_hex0rwindow($(this), index)
			})
		})
