# Montreal Open Data Hackathon (Nov 2011)
# Process flat data file into structured format

BEGIN {
	FS="\t"
	OFS="\t"
	system("mkdir -p data")
}

NF == 19 && $19 != "" {
	split($19, a, " ");
	ISN = a[1]
	len = length(ISN)
	if (len != 10 && len != 13) next
	if (ISN !~ /[0-9]*/) next
	prefix = substr(ISN, 0, 2)
	lenstr = "" + len
	system("mkdir -p data/" prefix)
	file = "data/" prefix "/" lenstr ".txt"
	print ISN, $6, $1 >> file
	close(file)
}
