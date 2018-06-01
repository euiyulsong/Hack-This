/*
Parses through the official script format, with head lines  indicating fields:
*/
export default function parseScript (script) {
  const metaFields = ['Name', 'Version', 'Author', 'Description', 'Group']
  if (script.includes('/*') && script.includes('*/')) {
    let metaData = {}
    //  Grab text between /* comments */ and split the lines
    const metaText = script.split('/*')[1].split('*/')[0].split('\n')
    // <key> :      <value> | the ":" gets discarded
    for (let line of metaText) {
      const [key, value] = line.split(':')
      if (key && metaFields.includes(key)) metaData[key.toLowerCase()] = value.trim()
    }
    return metaData
  } else {
    throw new Error('Could not parse script metadata')
  }
}

// EXAMPLE SCRIPT W/ METADATA
/*
Name:         Find Comments
Version:      1.0
Author:       Ryan Keller
Description:  Find and concat all legible comments in the page body, constructing a narrative of the code.
Group:        Static Analysis
*/
//  RETURN('Executed findComments')
