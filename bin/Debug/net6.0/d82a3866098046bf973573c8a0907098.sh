function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 62219;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 62219 > /dev/null;
done;

for child in $(list_child_processes 62242);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/joshuacastillo/Code/F2022/DotNetSmartAdvisor/bin/Debug/net6.0/d82a3866098046bf973573c8a0907098.sh;
