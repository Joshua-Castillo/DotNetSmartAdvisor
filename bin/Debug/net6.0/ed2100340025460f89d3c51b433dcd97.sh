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

ps 45051;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 45051 > /dev/null;
done;

for child in $(list_child_processes 45060);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/joshuacastillo/Code/F2022/SmartAdvisor/SmartAdvisor_ASPNetCoreReact/bin/Debug/net6.0/ed2100340025460f89d3c51b433dcd97.sh;
